import React, { Component } from 'react';
import styles from './AppContainer.scss'
import { connect } from 'react-redux'
import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter/AppFooter'
import intl from 'react-intl-universal'

const mapStateToProps = (state, props) => ({
    session: state
})

export class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
        this.changeLang = this.changeLang.bind(this)
    }

    changeLang() {
        const lang = intl.options.currentLocale
        intl.options.currentLocale = lang==='zh'?'en':'zh'
        this.forceUpdate()
        console.log(this.forceUpdate)
    }

    render() {
        console.log(this.props)
        return (
            <div className={styles.body}>
                <AppHeader />
                <button onClick={this.changeLang}>切换</button>
                <main className={styles.page}>
                <p>{intl.get('TABLECOL.NAME')}</p>
                </main>
                <AppFooter />
            </div>
        )
    }
}

export default connect(mapStateToProps)(AppContainer)

