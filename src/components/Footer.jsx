import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.module.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [t, i18n] = useTranslation();

  return (
    <>
      <div
        id="footer"
        className="container-fluid"
        style={{ backgroundColor: '#f5f5f5', margin: '2rem 0 0 0' }}
        dir={`${i18n.language}` === 'en' ? 'ltr' : 'rtl'}
      >
        <div className="row">
          <div className="d-flex align-items-start p-4 flex-wrap">
            <div className="d-flex flex-column col-md-12 col-lg-4">
              <div className="d-flex gap-2 align-items-center mb-3">
                <img
                  src={'images/chef.svg'}
                  alt="logo"
                  style={{ color: '#1c1c1c', width: '70px' }}
                  className="chefLogo"
                />
                <span className="mealMagic">
                  <span> Meal</span>{' '}
                  <span style={{ color: '#198754' }}>Magic</span>
                </span>
              </div>

              <div className="col-sm-12">
                <p className="text-muted">
                  {t(
                    'Dive into a world of diverse recipes on our website where flavor meets simplicity. Elevate your cooking with our expert-guided collection.'
                  )}
                </p>
                <br />
              </div>
            </div>
            <div className="d-flex col-md-11 col-lg-4 mx-md-5 mx-lg-0 p-4 mb-4">
              <div className="d-flex flex-column col-sm-4">
                <h5 className="col-sm-12  mb-3"> {t('Quick links')}</h5>
                <Link className="Link col-sm-12" to={'/Home'}>
                  <p>{t('Home')}</p>
                </Link>
                <Link className="Link col-sm-12" to={'/Recipes'}>
                  <p>{t('Recipes')}</p>
                </Link>
                <Link className="Link col-sm-12" to={'/Blog'}>
                  <p>{t('Blog')}</p>
                </Link>
              </div>
              <div className="d-flex flex-column col-sm-4 mx-4">
                <h5 className="col-sm-12 mb-3">{t('Quick links')}</h5>
                <Link className="Link col-sm-12" to={'/ShareRecipe'}>
                  <p>{t('Share Recipe')}</p>
                </Link>
                <Link className="Link col-sm-12" to={'/About'}>
                  <p>{t('About Us')}</p>
                </Link>
                <Link className="Link col-sm-12" to={'/contact'}>
                  <p>{t('Contact Us')}</p>
                </Link>
              </div>
              <div className="d-flex flex-column col-sm-4">
                <h5 className="col-sm-12  mb-3">{t('Legal')}</h5>
                <Link className="Link col-sm-12" to={'/Terms'}>
                  <p>{t('Terms Of Use')}</p>
                </Link>
                <Link className="Link col-sm-12" to={'/Privacy'}>
                  <p>{t('Privacy & Cookies')}</p>
                </Link>
              </div>
            </div>
            <div className="d-flex flex-column col-md-12 col-lg-4 text-center align-items-center mb-md-1">
              <br />
              <h4 className=" mb-3">{t('Newsletter')}</h4>
              <p className="col-lg-8">
                {t('Subscribe to our newsletter to get more free tips')}
              </p>
              <form className="col-md-10 col-lg-7 col-xl-9 col-sm-12">
                <input
                  className="form-control form-control-sm my-2"
                  type="email"
                  name="email"
                  id="email"
                  placeholder={`${i18n.language === 'en' ? 'Enter your email' : 'Ingiza barua pepe yako'}`}
                />
                <input
                  style={{ color: 'white' }}
                  className=" btn btn-success  form-control form-control-sm"
                  type="submit"
                  value={`${i18n.language === 'en' ? 'Subscribe' : 'Jiandikishe'}`}
                />
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Footer;
