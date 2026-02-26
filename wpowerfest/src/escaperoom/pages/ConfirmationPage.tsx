import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { Button } from '../components/common/Button';

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const users = useUserStore((state) => state.users);
  const reservations = useUserStore((state) => state.reservations);

  if (!users || users.length === 0 || !reservations || reservations.length === 0) {
    navigate('/escaperoom');
    return null;
  }

  return (
    <div className="min-h-screen bg-code-pattern py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="terminal-window mb-6">
          <div className="terminal-header">
            <div className="terminal-dot bg-error"></div>
            <div className="terminal-dot bg-warning"></div>
            <div className="terminal-dot bg-success"></div>
          </div>
          <div className="p-6 text-center">
            <div className="text-5xl mb-3">✓</div>
            <p className="text-success font-bold text-2xl font-display">
              Reservas Confirmadas!
            </p>
            <p className="text-gray-400 font-mono text-sm mt-2">
              <span className="text-code-green">status:</span> <span className="text-success">"success"</span>
            </p>
            <p className="text-gray-400 font-mono text-sm">
              <span className="text-code-green">reservations:</span> <span className="text-success">{reservations.length}</span>
            </p>
          </div>
        </div>

        <div className="card-glow">
          <h1 className="subtitle-code text-center mb-6">
            Códigos QR del Grupo
          </h1>

          {/* Grid de 2 columnas para las reservas */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {reservations.map((reservation, index) => (
              <div key={reservation.id} className="border border-secondary/30 rounded-lg p-5" style={{backgroundColor: '#161b22'}}>
                <div className="text-center mb-4">
                  <p className="font-bold text-secondary mb-2 font-display">
                    👤 Persona {index + 1}
                  </p>
                  <p className="text-gray-300 font-mono text-sm">
                    {reservation.user.firstName} {reservation.user.lastName}
                  </p>
                </div>

                {/* QR Code más pequeño */}
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img 
                    src={reservation.qrImage} 
                    alt={`QR de ${reservation.user.firstName}`}
                    className="mx-auto"
                    style={{ maxWidth: '180px', width: '100%' }}
                  />
                </div>

                {/* Datos de contacto */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 bg-gray-900/50">
                    <span className="text-xl">📧</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-mono">email:</p>
                      <p className="font-semibold text-gray-200 font-mono text-xs truncate">
                        {reservation.user.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 bg-gray-900/50">
                    <span className="text-xl">📱</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 font-mono">teléfono:</p>
                      <p className="font-semibold text-gray-200 font-mono text-xs">
                        {reservation.user.whatsapp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-warning/20 border border-warning/50 p-5 rounded-lg mb-6">
            <p className="font-bold text-warning mb-3 font-display">⚠️ Importante:</p>
            <ul className="text-gray-300 space-y-2 text-sm font-mono">
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>Cada persona debe presentar su propio código QR</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>Los QR fueron enviados a los emails de cada uno</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>Pueden guardar estos códigos (captura de pantalla)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>Los códigos QR son de un solo uso</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={() => navigate('/escaperoom')}
            className="w-full"
          >
            return home()
          </Button>
        </div>
      </div>
    </div>
  );
};
