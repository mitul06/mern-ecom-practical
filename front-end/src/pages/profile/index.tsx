import { FC } from "react";
import { useAppSelector } from "../../redux/hooks";

const Profile: FC = () => {

  const loggedUser = useAppSelector((state) => state.authReducer.loggedUser);

  return (
    <div className="container mx-auto min-h-[83vh] w-full max-w-5xl">
      <h1 className="text-4xl p-4 font-bold font-lora">Your Account</h1>
      <div className="font-karla grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-1 p-4">
        {
          loggedUser?.image ? <img src={loggedUser?.image} alt="pp" className="text-center" />
            : ''
        }
        <table>
          <tbody>
            <tr>
              <td className="font-bold">First Name</td>
              <td>{loggedUser?.firstName || '-'}</td>
            </tr>
            <tr>
              <td className="font-bold">Last Name</td>
              <td>{loggedUser?.lastName || '-'}</td>
            </tr>
            <tr>
              <td className="font-bold">Email</td>
              <td>{loggedUser?.email || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
