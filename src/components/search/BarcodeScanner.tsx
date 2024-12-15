import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Spinner } from '@nextui-org/react';
import { useZxing } from 'react-zxing';

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

  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
      onClose();
    },
    onError(error) {
      console.error("Scanner Error:", error);
      setError("Error accessing camera");
    },
    constraints: {
      facingMode: "environment"
    },
    timeBetweenDecodingAttempts: 300,
    onReady() {
      setIsLoading(false);
    }
  });

  const handleClose = () => {
    setError('');
    setIsLoading(true);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={(open) => !open && handleClose()}
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
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                )}
                {error ? (
                  <div className="absolute inset-0 flex items-center justify-center text-danger">
                    {error}
                  </div>
                ) : (
                  <>
                    <video
                      ref={ref}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 border-2 border-primary opacity-50" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 border-2 border-primary rounded-lg" />
                    </div>
                  </>
                )}
              </div>
              <p className="text-center text-small text-default-500">
                Coloca el código de barras dentro del recuadro
              </p>
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