import { useNavigate } from "@remix-run/react";

export default function SuccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    navigate("/auth?mode=login");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative z-50">
        <h2 className="text-2xl font-semibold text-green-600">
          ✅ Registro exitoso
        </h2>
        <p className="text-gray-600 mt-2">Ahora puedes iniciar sesión.</p>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-[#7C78B3] text-white rounded-lg w-full"
        >
          Ir a iniciar sesión
        </button>
      </div>
    </div>
  );
}
