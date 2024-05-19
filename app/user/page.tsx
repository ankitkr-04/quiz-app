import UserForm from "@/components/userForm";

const User = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">User Information</h1>
          <UserForm />
        </div>
      </div>
    );
  };
  
  export default User;