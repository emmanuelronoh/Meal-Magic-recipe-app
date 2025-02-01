import React from 'react';
import style from '../Styles/Landing.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function Landing() {
  const [t, i18n] = useTranslation();
  let logedInUser = useSelector((state) => state.logedInUser.logedInUser);
  return (
    <div id={style.landing} dir={`${i18n.language}`==='en'?"ltr":"rtl"}>
      <div className="container-fluid my-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1
             className={`${i18n.language === 'en' ? 'text-start' : 'text-end'} fw-bold`}
             style={{ fontFamily: 'Poppins,sans-serif' }}
            >
              {t('Daily Magics, Endless Delights: Join Our Food Journey')}
              <span className="text-success"> {t('Food')}</span>  {t('Journey')}
            </h1>
            <p className="my-4 fw-normal " style={{ maxWidth: '590px', fontFamily: 'serif', fontSize: '1.3rem' }}>
            {t('Recipes to Explore, where Passion Meets Palate, and Every Dish is a Symphony of Flavors')}
            </p>
            {!logedInUser&&
            <button className="btn btn-success shadow-sm px-4">
              <Link to="/signin" className="text-white text-decoration-none">
              {t('Sign up')}
              </Link>
            </button>}
            {!logedInUser&&
            <p className="mt-2 fw-normal"  style={{ fontSize: '1.1rem' }}>
            {t('Do you have an account?')}{' '}
              <Link
                to="/login"
                className="text-success text-decoration-none fw-bold"
              >
                 {t('Log in')}
              </Link>
            </p>}
          </div>

          <div className="col-md-6 text-center">
            <div className="img-container" style={{ maxWidth: '80%' }}>
              <img
                src={'images/ramen.png'}
                className={`${style.ramen} ramen w-100`}
                alt="ramen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
