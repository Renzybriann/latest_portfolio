export const LinkButton = ({ href, children, variant = 'solid', className = '', ...props }) => {
  const baseStyles = 'inline-block rounded-lg px-6 py-3 font-bold transition-all duration-300 text-center';
  const variants = {
    outline: 'border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black',
    solid: 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-700 dark:hover:bg-slate-300',
  };
  
  return (
    <a 
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};