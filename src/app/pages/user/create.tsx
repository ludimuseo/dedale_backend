import { collection, getDocs } from 'firebase/firestore'
import { type FC, useEffect, useState } from 'react'

import { db } from '@/firebase/firebase'
import { User, UserRole, emailRegex } from '@/types'
import {
  getInputConfig,
  getSelectConfig,
} from './configCreateUser/getInputCreateUser'

const UserCreate: FC = () => {
  // State to store user data
  const [user, setUser] = useState<Partial<User>>({
    role: UserRole.ADMIN, // Default role
  });

  //State to store validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State for client selection
  const [clientIdAndName, setClientIdAndName] = useState<{ id: string; name: string }[] | undefined>([]);
  const [clientName, setClientName] = useState<string>('');

  const selectOptions = getSelectConfig;
  const inputs = getInputConfig;

  // 🔹 Fetch clients from Firestore
  const fetchClients = async () => {
    interface ClientData {
      id: string;
      client?: { company?: { name?: string } };
      company?: { name?: string };
    }

    try {
      const querySnapshot = await getDocs(collection(db, 'clients'));
      const clientData: ClientData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ClientData, 'id'>),
      }));

      const clientPackageData = clientData
        .map((item) =>
          item.client?.company?.name
            ? { id: item.id, name: item.client.company.name }
            : item.company?.name
              ? { id: item.id, name: item.company.name }
              : undefined
        )
        .filter((item): item is { id: string; name: string } => item !== undefined);

      setClientIdAndName(clientPackageData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 🔹 Update user state when input changes
  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));

    //Validate email format
    if (field === 'email' && !emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  //Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 🔸 Check if there are validation errors before submitting
    if (Object.values(errors).some((error) => error)) {
      alert('Please fix the errors before submitting.');
      return;
    }

    console.log('User created:', user);
  };

  useEffect(() => {
    void fetchClients();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div>
        <div className="navbar rounded-xl bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost font-inclusive text-xl">User Management</a>
          </div>
        </div>
      </div>

      {/* MAIN FORM */}
      <main>
        <form onSubmit={handleSubmit} className="w-1/2">
          {/* 🔹 Role selection dropdown */}
          <select
            className="select select-bordered mt-4 w-full max-w-xs"
            value={user.role || ''}
            onChange={(e) => handleChange('role', e.target.value)}
          >
            <option disabled>Select user role</option>
            {selectOptions.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>

          {/* INPUT SECTION */}
          <div className="flex flex-row space-x-10">
            <div className="mt-6 w-1/2 border p-4">
              {/* 🔹 Dynamically generate input fields from config */}
              {inputs.map((input) => (
                <label className="form-control w-full max-w-xs" key={input.id}>
                  <p className="font-inclusive">{input.label}</p>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    maxLength={input.maxLength || 50}
                    value={user[input.field as keyof User] || ''}
                    onChange={(e) => handleChange(input.field, e.target.value)}
                    className="input input-bordered w-full max-w-xs font-inclusive"
                  />
                  {/* Display validation error messages */}
                  {errors[input.field] && <p className="text-red-500">{errors[input.field]}</p>}
                </label>
              ))}
            </div>

            {/* CLIENT SELECTION */}
            <div className="mt-6 w-1/2 border p-4">
              <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
                <div className="collapse-title font-inclusive text-xl font-medium">Associate a client</div>
                <div className="collapse-content">
                  {clientIdAndName?.map((item) => (
                    <p
                      key={item.id}
                      className="cursor-pointer hover:underline"
                      onClick={() => setClientName(item.name)}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-center font-inclusive">
                <span>{clientName && `Associated with client: ${clientName}`}</span>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex w-1/2 justify-center">
            <button type="submit" className="btn btn-primary mt-6 w-2/6 font-inclusive">
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export { UserCreate };
