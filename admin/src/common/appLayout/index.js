import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../navbar';
import Routes from '../routes';
import { Layout } from 'antd';

const { Content } = Layout;

const AppLayout = () => (
    <Router>
        <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
			<Navbar />
			<Layout>
				<Content style={{ padding: "2%" }}><Routes /></Content>
			</Layout>
		</Layout>
    </Router>
);

export default AppLayout;