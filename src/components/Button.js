const variantClass = {
  primary: 'btn btn-primary',
  outline: 'btn btn-outline',
  text: 'btn btn-text',
};

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  const base = variantClass[variant] || variantClass.primary;
  return (
    <button className={`${base} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
