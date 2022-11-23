import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import BuySellModal from './BuySell';
// import EditCardModal from './Card/EditCardForm/index2';
import './NavBar.css';
import coindex from '../aIMGS/coinbase.png'
import user from '../aIMGS/user.svg'
import { Modal } from '../context/Modal';
import menuDots from '../aIMGS/menu-dots.svg';
import menuMore from '../aIMGS/menu.svg';

const NavBar = () => {
  const currUser = useSelector(state => state.session.user);
  const [openMenu, setOpenMenu] = useState(false);
  const [moreMenu, setMoreMenu] = useState(false);
  const params = useParams();
  let { pageName } = params;
  const location = useLocation();

  let sessionLinks;

  const openDropdown = () => {
    console.log('SUP')
    if (!openMenu) setOpenMenu(true)
    if (openMenu) setOpenMenu(false)
  }

  const openMoreMenu = () => {
    if (!moreMenu) setMoreMenu(true)
    if (moreMenu) setMoreMenu(false)
  }

  const capitalizeFirstLetter = (name) => {
    let split = name.split('');
    let res = split[0]?.toUpperCase();
    split.splice(0, 1, `${res}`)
    return split.join('')
  }

  useEffect(() => {
    if (openMenu) setOpenMenu(false)
    console.log(location)
  }, [currUser])

  useEffect(() => {
    if (moreMenu) setMoreMenu(false)
  }, [currUser])


  if (currUser) {
    sessionLinks = (
      <>
        <div id='nav-wrapper'>
          <nav>
            <div id='nav-content'>
              <div id='pageName'>
                <div>{`${capitalizeFirstLetter(location.pathname.slice(1))}`}</div>
              </div>
              <div>
                <BuySellModal />
              </div>
              <div id='profile-more-menu' onClick={openMoreMenu}>
                <div id='menu-img-div'>
                  <img src={menuMore} alt='dots' id='more-menu-img' />
                </div>
                {moreMenu && (
                  <Modal onClose={() => setMoreMenu(false)}>
                    <div id='more-profile-container'>
                      <div className='section-container' id='for-individuals-container'>
                        <h2 className='more-header' id='individuals-header'>FOR INDIVIDUALS</h2>
                        <div className='links-div-row1' id='individuals-links-div'>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/coinbaseLogoNavigation-0.svg' alt='cb-more' />
                            </div>
                            <p className='card-caption'>Coinbase</p>
                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='	https://static-assets.coinbase.com/design-system/illustrations/light/walletNavigation-3.svg' alt='wallet-more' />
                            </div>
                            <p className='card-caption'>Wallet</p>
                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/accountsNavigation-1.svg' alt='accounts-more' />
                            </div>
                            <div>Accounts</div>
                          </div>
                        </div>
                        <div className='links-div-row2' id='individuals-links-div'>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/nftNavigation-2.svg' alt='nft-more' />
                            </div>
                            <p className='card-caption'>NFT</p>

                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/nftNavigation-2.svg' alt='help-more' />
                            </div>
                            <p className='card-caption'>Help center</p>

                          </div>
                        </div>
                      </div>
                      <div className='separator-line'></div>
                      <div className='section-container' id='for-businesses-container'>
                        <h2 className='more-header' id='businesses-header'>FOR BUSINESSES</h2>
                        <div className='links-div-row1' id='businesses-links-div'>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/nftNavigation-2.svg' alt='prime-more' />
                            </div>
                            <p className='card-caption'>Prime</p>

                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/coinbaseLogoNavigation-0.svg' alt='commerce-more' />
                            </div>
                            <p className='card-caption'>Commerce</p>

                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/commerceNavigation-2.svg' alt='exchange-more' />
                            </div>
                            <p className='card-caption'>Exchange</p>

                          </div>
                        </div>
                        <div className='links-div-row2' id='businesses-links-div'>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/analyticsNavigation-2.svg' alt='tracer-more' />
                            </div>
                            <p className='card-caption'>Tracer</p>

                          </div>
                        </div>
                      </div>
                      <div className='separator-line'></div>
                      <div className='section-container' id='for-developers-container'>
                        <h2 className='more-header' id='developers-header'>FOR DEVELOPERS</h2>
                        <div className='links-div-row1' id='developers-links-div'>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/walletLinkNavigation-2.svg' alt='wallet-sdk-more' />
                            </div>
                            <p className='card-caption'>Wallet SDK</p>

                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/queryTransactNavigation-2.svg' alt='node-more' />
                            </div>
                            <p className='card-caption'>Node</p>

                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/participateNavigation-1.svg' alt='participate-more' />
                            </div>
                            <p className='card-caption'>Participate</p>

                          </div>
                        </div>
                        <div className='links-div-row2' id='developers-links-div'>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/nftNavigation-2.svg' alt='prime-API-more' />
                            </div>
                            <p className='card-caption'>Prime API</p>

                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/signInNavigation-2.svg' alt='cb-more' />
                            </div>
                            <p className='card-caption'>Sign in with Coinbase </p>

                          </div>
                          <div className='link-card'>
                            <div>
                              <img className='link-card-img' src='https://static-assets.coinbase.com/design-system/illustrations/light/signInNavigation-2.svg' alt='cb-more' />
                            </div>
                            <p className='card-caption'>Commerce API</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
              <div id='user-profile' onClick={openDropdown}>
                <img src={user} alt='user-profile' id='user-img' />
              </div>
              {openMenu && (

                <Modal onClose={() => setOpenMenu(false)} >
                  <div id='dropdown'>
                    <p>{currUser.firstName} {currUser.lastName}</p>
                    <p>{currUser.email}</p>
                    <p>{currUser.username}</p>
                    <div>
                      <LogoutButton />
                    </div>
                  </div>
                </Modal>

              )}
            </div>
          </nav>
        </div>
      </>
    )
  } else {
    sessionLinks = (
      <div id='nav-wrapper'>
        <div id='logo-logo-logo'>
          <img src={coindex} alt='logo' style={{ height: "60px", widht: "60px" }} />
          <div id='wordLogo'>oindex-ss</div>
        </div>
        <nav>
          <div id='nav-content'>
            {/* <NavLink style={{ textDecoration: "none" }} to='/' exact={true} activeClassName='active'>
              <div className='navBar-buttons'>
                Home
              </div>
            </NavLink> */}
            <div id='coindex-logo'>

            </div>
            <NavLink style={{ textDecoration: "none" }} to='/login' exact={true} activeClassName='active'>
              <div className='navBar-buttons'>
                Login
              </div>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to='/sign-up' exact={true} activeClassName='active'>
              <div className='navBar-buttons'>
                Sign Up
              </div>
            </NavLink>
            {/* <div>
                      <NavLink style={{textDecoration:"none"}}  to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div> */}
          </div>
        </nav>
      </div>
    )
  }


  return (
    <div id='nav-wrapper'>
      <>{sessionLinks}</>
    </div>
  );
}

export default NavBar;
