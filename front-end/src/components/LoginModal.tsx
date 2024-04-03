import { FC, FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { isLoggedIn, updateModal } from "../redux/features/authSlice";
import { FaUnlock } from "react-icons/fa";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { loginService, registerService } from "../services/authService";
import useToggle from "../hooks/useToggel";

export type Inputs = {
  firstName?: string
  lastName?: string
  email: string
  password: string
}

const LoginModal: FC = () => {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showToast = useToggle()

  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.authReducer.modalOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res: any = await loginService({ email, password });

      if (res?.data?.success) {
        dispatch(isLoggedIn())

        setTimeout(() => {
          dispatch(updateModal(false))
        }, 1000)

        showToast('success', 'Login Successfully')
      } else {
        setClicked(true)
        showToast('error', res?.data?.message)
      }

    } catch (error: any) {
      showToast('error', error?.response?.data?.message)
    }

  };

  const handleRegister: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const res: any = await registerService(data);

      if (res?.data?.success) {
        setClicked(false)
      } else {
        setClicked(true)
      }
    } catch (error) {
      console.log(error)
    }
  }


  if (open) {
    return (
      <div className="bg-[#0000007d] w-full min-h-screen fixed inset-0 z-30 flex items-center justify-center font-karla">
        <div
          className="relative border shadow rounded p-8 bg-white max-w-md w-full z-40"
          data-test="login-container"
        >
          <RxCross1
            className="absolute cursor-pointer right-5 top-5 hover:opacity-85"
            onClick={() => dispatch(updateModal(false))}
          />
          {clicked ? (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <h3 className="font-bold text-center text-xl">Register</h3>
              </div>
              <div>
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit(handleRegister)}>
                  <input type="text"
                    placeholder="First Name"
                    className="border w-full border-black py-2 px-8 rounded"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && <span className="text-red-500" >First Name is required</span>}

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border w-full border-black py-2 px-8 rounded"
                    {...register("lastName", { required: true })}
                  />

                  {errors.lastName && <span className="text-red-500" >Last Name is required</span>}

                  <input
                    type="text"
                    placeholder="Email"
                    className="border w-full border-black py-2 px-8 rounded"
                    {...register("email", { required: true })}
                  />

                  {errors.email && <span className="text-red-500" >Email is required</span>}

                  <input
                    placeholder="Password"
                    type="password"
                    className="border w-full border-black py-2 px-8 rounded"
                    {...register("password", { required: true })}
                  />

                  {errors.password && <span className="text-red-500" >Password is required</span>}

                  <input
                    data-test="input-submit"
                    type="submit"
                    value="Submit"
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
                  />
                </form>

              </div>
              <p className="leading-4 mt-3">
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setClicked(false)}
                >
                  Go to login
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <FaUnlock />
                <h3 className="font-bold text-center text-2xl">Login</h3>
                <FaUnlock />
              </div>
              <form onSubmit={submitForm} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    data-test="input-email"
                    type="text"
                    placeholder="Your email"
                    className="border w-full border-black py-2 px-8 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <RiUser3Fill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    data-test="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password"
                    className="border w-full border-black py-2 px-8 rounded"
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <input
                  data-test="input-submit"
                  type="submit"
                  value="Submit"
                  className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
                />
              </form>
              <p className="text-center mt-1">
                No Account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setClicked(true)}
                >
                  Register
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default LoginModal;
