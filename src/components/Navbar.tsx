import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="links">
        <div className="logo">Lordkaito&apos;s</div>

        {/* we will need to add an icon menu for smaller screens */}

        <ul className="nav-ul">
          <li className="link home-link">
            <Link href="/home">Home</Link>
          </li>
          <li className="link login-link">
            <Link href="/auth/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
