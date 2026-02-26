import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userApi } from '../api/user.api';
import { useUserStore } from '../store/userStore';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import type { User } from '../types/user.types';

export const SearchUserPage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setUsers = useUserStore((state) => state.setUsers);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [registrationClosed, setRegistrationClosed] = useState(false);
  const [closedMessage, setClosedMessage] = useState('');

  const handleSearch = async () => {
    if (!email.trim()) {
      toast.error('Ingresa un email');
      return;
    }

    try {
      setLoading(true);
      setNotFound(false);
      setSearchResult(null);
      setRegistrationClosed(false);

      const response = await userApi.searchByEmail(email.trim());

      if (response.success) {
        setSearchResult(response.data);
        setUser(response.data);
        
        // Si el usuario tiene partner, guardar ambos en el store
        if (response.data.partner) {
          const usersArray = [
            response.data,
            {
              id: response.data.partner.id,
              firstName: response.data.partner.firstName,
              lastName: response.data.partner.lastName,
              email: response.data.partner.email,
              whatsapp: response.data.partner.whatsapp,
              triviaCompleted: response.data.partner.triviaCompleted,
              createdAt: response.data.createdAt,
              partnerId: response.data.id,
            }
          ];
          console.log('✅ Usuario encontrado con partner. Guardando en store:', usersArray);
          setUsers(usersArray);
        } else {
          console.warn('⚠️ Usuario encontrado pero sin partner asociado');
        }
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setNotFound(true);
      } else if (error.response?.status === 403) {
        setRegistrationClosed(true);
        setClosedMessage(error.response.data.error || 'Registro cerrado');
      } else {
        toast.error(error.message || 'Error al buscar usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToTrivia = () => {
    if (searchResult) {
      navigate('/escaperoom/trivia');
    }
  };

  if (registrationClosed) {
    return (
      <div className="min-h-screen bg-code-pattern py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card-glow border-warning/50">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-error"></div>
                <div className="terminal-dot bg-warning"></div>
                <div className="terminal-dot bg-success"></div>
              </div>
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="subtitle-code text-warning mb-4">
                  Access Denied
                </h2>
                <p className="text-gray-300 font-mono text-sm mb-3">
                  <span className="text-error">Error:</span> {closedMessage}
                </p>
                <Button
                  onClick={() => navigate('/escaperoom')}
                  variant="outline"
                  className="mt-4"
                >
                  ← Volver
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-code-pattern py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card-glow">
          <div className="text-center mb-8">
            <h1 className="title-code mb-3">
              Buscar Usuario
            </h1>
            <p className="text-code font-mono text-sm">
              <span className="text-code-green">{'{'}</span>Ingresa tu email para continuar con la trivia<span className="text-code-green">{'}'}</span>
            </p>
          </div>

          <div className="space-y-5">
            <Input
              label="email"
              type="email"
              placeholder="dev@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />

            <Button
              onClick={handleSearch}
              loading={loading}
              className="w-full"
            >
              {loading ? 'Buscando...' : 'search() →'}
            </Button>

            {notFound && (
              <div className="terminal-window border-error/50">
                <div className="terminal-header">
                  <div className="terminal-dot bg-error"></div>
                  <div className="terminal-dot bg-warning"></div>
                  <div className="terminal-dot bg-success"></div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-3">❌</div>
                  <p className="text-error font-bold mb-2 font-mono">
                    Usuario no encontrado
                  </p>
                  <p className="text-gray-400 text-sm font-mono mb-4">
                    El email no está registrado
                  </p>
                  <Button
                    onClick={() => navigate('/escaperoom')}
                    variant="outline"
                    className="w-full"
                  >
                    Registrarse →
                  </Button>
                </div>
              </div>
            )}

            {searchResult && (
              <div className="terminal-window border-success/50">
                <div className="terminal-header">
                  <div className="terminal-dot bg-error"></div>
                  <div className="terminal-dot bg-warning"></div>
                  <div className="terminal-dot bg-success"></div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">✓</div>
                    <p className="text-success font-bold mb-2 font-mono">
                      Usuario encontrado
                    </p>
                  </div>

                  <div className="bg-gray-900/50 p-4 rounded-lg mb-4 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-code-green">firstName:</span>{' '}
                      <span className="text-gray-300">"{searchResult.firstName}"</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-code-green">lastName:</span>{' '}
                      <span className="text-gray-300">"{searchResult.lastName}"</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-code-green">email:</span>{' '}
                      <span className="text-gray-300 break-all">"{searchResult.email}"</span>
                    </div>
                    {searchResult.partner && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="mb-2">
                          <span className="text-code-green">partner:</span>{' '}
                          <span className="text-gray-300">"{searchResult.partner.firstName} {searchResult.partner.lastName}"</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-code-green">partnerEmail:</span>{' '}
                          <span className="text-gray-300 break-all">"{searchResult.partner.email}"</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {searchResult.triviaCompleted ? (
                    <div>
                      <div className="bg-success/10 border border-success/30 p-4 rounded-lg text-center mb-3">
                        <p className="text-success font-bold mb-2 font-mono">
                          ✓ Trivia completada
                        </p>
                        <p className="text-gray-400 text-sm font-mono">
                          Ya completaste la trivia. Revisa tu email y WhatsApp para el código QR.
                        </p>
                      </div>
                      <Button
                        onClick={() => navigate('/escaperoom/resend-qr')}
                        variant="outline"
                        className="w-full"
                      >
                        Reenviar QR →
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleGoToTrivia}
                      className="w-full"
                    >
                      startTrivia() →
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="divider-code"></div>

            <Button
              onClick={() => navigate('/escaperoom')}
              variant="outline"
              className="w-full"
            >
              ← Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
