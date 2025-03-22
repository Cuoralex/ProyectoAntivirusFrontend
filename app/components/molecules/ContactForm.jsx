import React, { useState } from 'react';

const ContactForm = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requestType: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = 'El nombre es requerido';
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener exactamente 10 dígitos';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }
    if (!formData.requestType)
      newErrors.requestType = 'Por favor seleccione una opción';
    if (!formData.comments.trim())
      newErrors.comments = 'Los comentarios son requeridos';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: onlyNums.slice(0, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        requestType: '',
        comments: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

  const requestTypes = [
    { value: 'petition', label: 'Petición' },
    { value: 'complaint', label: 'Queja' },
    { value: 'claim', label: 'Reclamo' },
    { value: 'congratulation', label: 'Felicitación' },
    { value: 'suggestion', label: 'Sugerencia' }
  ];

  return (
    <div className={`w-full p-4 rounded-lg shadow-md text-white h-full flex flex-col ${className}`}
      style={{
        background: "linear-gradient(135deg, #2C395B 0%, #06407A 50%, #2C9BC7 100%)"
      }}>
      {submitted ? (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">¡Gracias por contactarnos!</h3>
          <p className="mb-4">Hemos recibido tu mensaje y nos pondremos en contacto pronto.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="py-1.5 px-3 rounded font-medium bg-[#32526E] hover:bg-[#222D56] text-white dark:bg-[#7C76B5] dark:hover:bg-[#4D3281]"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-center">Contáctanos</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="block font-light mb-1 text-sm">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-1.5 text-sm border rounded dark:bg-[#32526E] dark:border-[#708BC6] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="block font-light mb-1 text-sm">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className={`w-full p-1.5 text-sm border rounded dark:bg-[#32526E] dark:border-[#708BC6] ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="block font-light mb-1 text-sm">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-1.5 text-sm border rounded dark:bg-[#32526E] dark:border-[#708BC6] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="requestType" className="block font-light mb-1 text-sm">Seleccionar</label>
              <select
                id="requestType"
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className={`w-full p-1.5 text-sm border rounded text-black font-medium dark:bg-[#32526E] dark:border-[#708BC6] ${errors.requestType ? 'border-red-500' : 'border-gray-300'}`}
                style={{
                  color: 'black',
                  fontWeight: '500'
                }}
              >
                <option value="" className="text-black font-medium">Seleccione una opción</option>
                {requestTypes.map((type) => (
                  <option key={type.value} value={type.value} className="text-black font-medium">
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.requestType && (
                <p
                  className="text-xs mt-1 font-medium"
                  style={{
                    color: '#FF0033',
                    textShadow: '0px 0px 1px rgba(255,255,255,0.5)'
                  }}
                >
                  {errors.requestType}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="comments" className="block font-light mb-1 text-sm">Comentarios</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="3"
                className={`w-full p-1.5 text-sm border rounded text-black font-medium dark:bg-[#32526E] dark:border-[#708BC6] ${errors.comments ? 'border-red-500' : 'border-gray-300'}`}
                style={{
                  color: 'black',
                  fontWeight: '500'
                }}
              ></textarea>
              {errors.comments && <p className="text-red-500 text-xs mt-1">{errors.comments}</p>}
            </div>

            <div className="text-center mt-4 mb-2">
              <button
                type="submit"
                className="py-2 px-6 rounded font-medium text-base bg-[#32526E] hover:bg-[#222D56] text-white dark:bg-[#7C76B5] dark:hover:bg-[#4D3281]"
              >
                Enviar
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm;