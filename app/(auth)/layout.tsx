const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-screen grid place-items-center bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center'>
      {children}
    </main>
  );
};

export default AuthLayout;
