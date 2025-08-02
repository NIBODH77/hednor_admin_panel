// import LogoDark from "public/images/logos/Hednor.svg";
// import Image from "next/image";
// import Link from "next/link";

// const Logo = () => {
//   return (
//     <Link href="/">
//         <Image src={Hednor} alt="logo" />
//     </Link>
//   );
// };

// export default Logo;
import Hednor from "public/images/logos/Hednor.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
      <Link href="/">
        <Image src={Hednor} alt="logo" width={100} height={60} />
      </Link>
    </div>
  );
};

export default Logo;

