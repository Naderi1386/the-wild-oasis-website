import Image from "next/image";

function SignInButton() {
  return (
    <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
      <Image
        src="https://authjs.dev/img/providers/github.svg"
        alt="Github logo"
        height="24"
        width="24"
      />
      <span>Continue with Github</span>
    </button>
  );
}

export default SignInButton;
