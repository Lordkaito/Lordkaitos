import { observer } from "mobx-react";
import React from "react";

interface ProfileProps {
  id: string;
}

const Profile = observer((props: ProfileProps) => {
  return <div>Profile</div>;
});

export default Profile;
