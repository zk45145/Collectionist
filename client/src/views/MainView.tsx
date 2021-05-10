import { Layout } from 'antd';
import { css, SerializedStyles } from '@emotion/core';
import React, { useEffect } from 'react';

import CollectionList from './Collections/List';
import CollectionSingle from './Collections/Single';
import CollectionElementSingle from './CollectionElements/Single';
import CollectionTypeList from './CollectionTypes/List';
import MobileNavbar from '../components/MobileNavbar';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import { User } from '../types/user';
import { useUser } from '../UserContext';

const styles = (): SerializedStyles => css`
    height: 100%;

    .ant-layout-content {
        padding: 44px 0;

        @media (max-width: 767px) {
            padding-top: 96px;
        }
    }

    .container {
        width: 1320px;
        margin-left: auto;
        margin-right: auto;

        @media (max-width: 1399px) {
            width: 1140px;
        }

        @media (max-width: 1199px) {
            width: 960px;
        }

        @media (max-width: 991px) {
            width: 720px;
        }

        @media (max-width: 767px) {
            width: 540px;
            padding-left: 15px;
            padding-right: 15px;
        }

        @media (max-width: 575px) {
            width: 100%;
        }
    }

    .top-row {
        display: flex;
        justify-content: space-between;
    }

    .ant-breadcrumb {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 32px;
    }

    .load-spinner {
        text-align: center;
    }

    .ant-form-item {
        &.upload {
            .ant-form-item-control {
                max-height: 138px;
            }
        }
    }

    .ant-upload {
        &.ant-upload-select {
            &.ant-upload-select-picture-card {
                width: 100%;
                height: 120px;
            }
        }
    }

    .ant-upload-picture-card-wrapper {
        max-height: 138px;
    }

    .ant-upload-list-picture-card-container {
        width: 100%;
        height: 130px;
    }

    .ant-upload-list-picture-card {
        .ant-upload-list-item {
            padding: 0;
        }
    }

    .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
    .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
        object-fit: cover;
    }

    .upload-button-text {
        font-size: 12px;

        .heading {
            margin-top: 6px;
        }

        .subheading {
            color: rgba(0, 0, 0, 0.65);
        }
    }
`;

const { Content } = Layout;

interface Props {
    user?: User;
    type: "collections" | "collection-types" | "collections-single" | "collection-element-single"; 
}

const MainView = ({ type }: Props): JSX.Element => {
    const { user, loadUser } = useUser();

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const renderSwitch = (type: string): JSX.Element => {
        switch(type) {
            case "collections":
                return <CollectionList user={user} />;
            case "collections-single":
                return <CollectionSingle user={user} />;
            case "collection-element-single":
                return <CollectionElementSingle />;
            case "collection-types":
                return <CollectionTypeList />;
            default:
                return <CollectionList user={user} />;
        }
    };

    return (
        <Layout css={styles}>
            <TopBar />
            <Navbar />
            <MobileNavbar user={user} />
            <Content>
                <div className="container">
                    { renderSwitch(type) }
                </div>
            </Content>
        </Layout>
    );
};

export default MainView;