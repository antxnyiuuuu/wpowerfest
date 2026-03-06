import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import styles from './EmailInput.module.css';

interface EmailInputProps {
  label: string;
  username: string;
  domain: string;
  onUsernameChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const EMAIL_DOMAINS = [
  '@gmail.com',
  '@hotmail.com',
  '@outlook.com',
  '@yahoo.com',
];

export function EmailInput({
  label,
  username,
  domain,
  onUsernameChange,
  onDomainChange,
  error,
  required = false,
}: EmailInputProps) {
  const [isCustomEmail, setIsCustomEmail] = useState(false);
  const [localValue, setLocalValue] = useState('');

  const handleDomainChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomEmail(true);
      // Si ya tiene un email completo, extraer solo el username
      const currentEmail = username && domain ? `${username}${domain}` : '';
      
      // Si el email ya tiene un dominio conocido, removerlo
      let cleanEmail = currentEmail;
      for (const knownDomain of EMAIL_DOMAINS) {
        if (currentEmail.endsWith(knownDomain)) {
          cleanEmail = currentEmail.replace(knownDomain, '');
          break;
        }
      }
      
      setLocalValue(cleanEmail);
      onUsernameChange(cleanEmail);
      onDomainChange('');
    } else {
      setIsCustomEmail(false);
      setLocalValue('');
      onDomainChange(value);
    }
  };

  const handleInputChange = (value: string) => {
    if (isCustomEmail) {
      setLocalValue(value);
      
      const atIndex = value.lastIndexOf('@');
      if (atIndex > 0) {
        const newUsername = value.substring(0, atIndex);
        const newDomain = '@' + value.substring(atIndex + 1);
        onDomainChange(newDomain);
        onUsernameChange(newUsername);
      } else if (atIndex === 0) {
        onDomainChange(value);
        onUsernameChange('');
      } else {
        onUsernameChange(value);
        onDomainChange('');
      }
    } else {
      // Detectar si el usuario escribió el email completo con @
      const hasAtSymbol = value.includes('@');
      
      if (hasAtSymbol) {
        const atIndex = value.lastIndexOf('@');
        const userDomain = '@' + value.substring(atIndex + 1);
        const cleanUsername = value.substring(0, atIndex);
        
        // Verificar si el dominio está en la lista de dominios conocidos
        const isDomainInList = EMAIL_DOMAINS.includes(userDomain);
        
        if (isDomainInList) {
          // Si el dominio está en la lista, cambiar el selector automáticamente
          onUsernameChange(cleanUsername);
          onDomainChange(userDomain);
        } else {
          // Si el dominio NO está en la lista, cambiar a "Otro"
          setIsCustomEmail(true);
          setLocalValue(value);
          onUsernameChange(cleanUsername);
          onDomainChange(userDomain);
        }
      } else {
        onUsernameChange(value);
      }
    }
  };

  // Calcular el email final evitando duplicados
  const getFinalEmail = () => {
    if (isCustomEmail) {
      return inputValue || 'correo@ejemplo.com';
    }
    
    // Si el username ya contiene el dominio seleccionado, no duplicar
    if (username && username.includes('@')) {
      const userDomainPart = '@' + username.split('@')[1];
      if (userDomainPart === domain) {
        return username;
      }
    }
    
    return `${username || 'usuario'}${domain}`;
  };

  const inputValue = isCustomEmail ? localValue : username;
  const placeholder = isCustomEmail ? 'correo@ejemplo.com' : 'usuario';

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.inputWrapper}>
        <div className={styles.inputGroup}>
          <motion.input
            type={isCustomEmail ? 'email' : 'text'}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ''}`}
            initial={false}
            whileFocus={{ scale: 1.01 }}
          />
          
          <motion.select
            value={isCustomEmail ? 'custom' : domain}
            onChange={(e) => handleDomainChange(e.target.value)}
            className={`${styles.select} ${error ? styles.error : ''}`}
            initial={false}
            whileFocus={{ scale: 1.01 }}
          >
            {EMAIL_DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
            <option value="custom">Otro</option>
          </motion.select>
        </div>

        <div className={styles.icon}>
          <Mail className={styles.iconSvg} />
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.errorMessage}
        >
          {error}
        </motion.p>
      )}

      <p className={styles.preview}>
        Email completo: {getFinalEmail()}
      </p>
    </div>
  );
}
