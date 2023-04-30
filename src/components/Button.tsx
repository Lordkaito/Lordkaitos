import Link from "next/link"

type ButtonProps = {
  text: string
}

const Button = (text: ButtonProps) => {

  return (
    <div className="result">
      <button className="btn btn-primary">
        <Link href="/">Link</Link>
      </button>
    </div>
  );
};

export default Button;
