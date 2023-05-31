import chibi from "@/assets/images/chibi.png";
import Navbar from "@/components/Navbar";
import Image from "next/image";
// import "../assets/styles/SplashScreen.css";
import Button from "@/components/Button";

// WELCOME-SPLASH PAGE //

const SplashScreen = () => {
  return (
    <>
      <Navbar />
      <div className="splash-main-cont">
        <section className="main-container">
          <div className="main-card">
            <div className="icon-chibi">
              <Image src={chibi} alt="chibi" className="chibi-img" />
            </div>
            <div className="social">
              <div className="twitter">
                {/* <SiTwitter className="twitter-icon icon" /> */}
              </div>
              <div className="instagram">
                {/* <SiInstagram className="instagram-icon icon" /> */}
              </div>
              <div className="twitch">
                {/* <SiTwitch className="twitch-icon icon" /> */}
              </div>
              <div className="tiktok">
                {/* <SiTiktok className="tiktok-icon icon" /> */}
              </div>
            </div>
            <div className="beni-name-cont">
              <h2 className="name-title">BENIARTS</h2>
              <p className="name-description">♡ ILLUSTRATOR & EMOTE ARTIST ♡</p>
            </div>
            <div className="comms-prices-container">
              <Button
                text="Commission form"
              />
              <Button
                text="Prices"
              />
            </div>
            <div className="waitlist-kofi-container">
              <Button
                text="KO-FI"
              />
              <Button
                text="Waitlist"
              />
              <Button
                text="T.O.S"
              />
            </div>
            <footer className="footer-container">
              <div className="footer-text">(Made with ❤️ by Beniarts)</div>
            </footer>
          </div>
        </section>
      </div>
    </>
  );
};

// this is for anyone that is not registered and just wants to see what this is about

export default SplashScreen;
