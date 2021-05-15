import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { css, SerializedStyles } from '@emotion/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { User } from '../types/user';

const styles = (): SerializedStyles => css`
    display: none;
    padding: 0;
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    z-index: 1001;

    @media (max-width: 767px) {
        display: block;

        .ant-menu {
            display: none;
        }

        &.menu-open {
            .ant-menu {
                display: block;
            }
        }
    }

    .bar {
        background: #fff;
        height: 64px;
        line-height: 64px;

        h1 {
            margin-bottom: 0;
        }

        .anticon-menu {
            padding: 10px;
        }

        > .container {
            display: flex;
            justify-content: space-between;
            place-items: center;
        }
    }

    .ant-menu {
        width: 540px;
        margin: 0 auto;
        line-height: 48px;

        @media (max-width: 575px) {
            width: 100%;
        }
    }
`;

const { Header } = Layout;

interface Props {
    user?: User;
}

const MobileNavbar = ({ user }: Props): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();
    
    return (
        <Header className={`header ${isMenuOpen ? `menu-open` : ``}`} css={styles}>
            <div className="bar">
                <div className="container">
                    <h1>Collectionist</h1>
                    <MenuOutlined onClick={() => setIsMenuOpen(prev => !prev)} />
                </div>
            </div>            
            <Menu theme="light">
                <div className="container">
                    <Menu.Item
                        key="collections"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Link to="/collections">{ t('collections.list.title') }</Link>
                    </Menu.Item>
                    {
                        user?.role === 'ADMIN' && (
                            <Menu.Item
                                key="collection-types"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link to="/collection-types">{ t('collectionTypes.list.title') }</Link>
                            </Menu.Item>
                        )
                    }
                    {
                        user?.role === 'ADMIN' && (
                            <Menu.Item
                                key="users"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link to="/users">{ t('users.list.title') }</Link>
                            </Menu.Item>
                        )
                    }
                    {
                        user?.id ? (
                            <Menu.Item
                                key="edit-profile"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>{ t('users.profile.edit') }</span>
                            </Menu.Item>
                        ) : (
                            <Menu.Item
                                key="login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link to="/login">{ t('login.common.link.log-in') }</Link>
                            </Menu.Item>
                        )
                    }
                </div>
            </Menu>
        </Header>
    );
};

export default MobileNavbar;