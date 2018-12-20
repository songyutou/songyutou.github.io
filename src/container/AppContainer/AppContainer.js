import React, { Component } from 'react';
import styles from './AppContainer.scss'

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter/AppFooter'

export default class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }
    render() {
        console.log(this.props)
        return (
            <div className={styles.body}>
                <AppHeader />
                <main className={styles.page}>
                <p>hello...</p>
                </main>
                <AppFooter />
            </div>
        )
    }
}



