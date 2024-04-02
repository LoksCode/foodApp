export default function Button({ children, textOnly, addClass, ...props }) {
  let chosenClasses = textOnly ? 'text-button' : 'button';
  chosenClasses += ' ' + addClass;

  return (
    <button {...props} className={chosenClasses}>
      {children}
    </button>
  );
}
