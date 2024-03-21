import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import details from "../data/footerDetails.json"

import LogoComp from "./LogoComp";

const CustomFooterSection = () => {
  return (
    <>
      {details.map((data) => (
        <div key={data.title}>
          <Footer.Title title={data.title} />
          <Footer.LinkGroup col>
            {data.link.map((li) => (
              <Footer.Link
                key={li.content}
                href={li.hrefPath}
                target="_blank"
                rel="noopener noreferrer"
              >
                {li.content}
              </Footer.Link>
            ))}
          </Footer.LinkGroup>
        </div>
      ))}
    </>
  );
};

const FooterComp = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <LogoComp />
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <CustomFooterSection />
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Master Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon
              href="https://github.com/sahandghavidel"
              icon={BsGithub}
            />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
