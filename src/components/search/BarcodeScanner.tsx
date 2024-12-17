import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Spinner } from '@nextui-org/react';
import { useZxing } from 'react-zxing';
import { Camera, AlertTriangle } from 'lucide-react';

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  isOpen,
  onClose,
  onScan,
}) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
      handleClose();
    },
    onError(error) {
      console.error("Scanner Error:", error);
      setError("Error al acceder a la cámara");
    },
    constraints: {
      facingMode: "environment",
      aspectRatio: 1,
    },
    timeBetweenDecodingAttempts: 300,
    onReady() {
      setIsLoading(false);
    },
    paused: !isOpen, // Pause scanning when modal is closed
  });

  useEffect(() => {
    let mounted = true;

    const initializeCamera = async () => {
      if (!isOpen) return;

      try {
        setError('');
        setIsLoading(true);
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "environment",
            aspectRatio: 1,
          } 
        });

        if (mounted) {
          setStream(mediaStream);
          setHasPermission(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Camera initialization error:', err);
        if (mounted) {
          setHasPermission(false);
          setError('No se pudo acceder a la cámara. Por favor, concede los permisos necesarios.');
          setIsLoading(false);
        }
      }
    };

    if (isOpen) {
      initializeCamera();
    }

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setError('');
    setIsLoading(true);
    setHasPermission(null);
    onClose();
  };

  const renderContent = () => {
    if (!hasPermission) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <AlertTriangle className="w-12 h-12 text-danger" />
          <p className="text-center text-danger">
            {error || 'No hay acceso a la cámara'}
          </p>
          <Button 
            color="primary"
            onPress={() => window.location.reload()}
          >
            Reintentar
          </Button>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <AlertTriangle className="w-12 h-12 text-danger" />
          <p className="text-center text-danger">{error}</p>
        </div>
      );
    }

    return (
      <>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="flex flex-col items-center gap-4">
                <Spinner size="lg" />
                <p className="text-small">Iniciando cámara...</p>
              </div>
            </div>
          )}
          <video
            ref={ref}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          <div className="absolute inset-0">
            <div className="absolute inset-0 border-2 border-primary opacity-50" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 border-2 border-primary rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary opacity-50" />
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-small text-default-500">
          Coloca el código de barras dentro del recuadro
        </p>
      </>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={handleClose}
      size="2xl"
      placement="center"
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Escanear Código de Barras
            </ModalHeader>
            <ModalBody>
              {renderContent()}
              <div className="flex justify-end gap-2 pb-4">
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={handleClose}
                >
                  Cancelar
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
