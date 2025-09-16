export function Input(props) {
  return <input className="input" {...props} />;
}

export function Label({ htmlFor, children }) {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
