import React from 'react'

const InitSeedForm = ({ initializingSeed, useCustomPassphrase, hideInitSeedForm, createNewWallet }) => {
	if (initializingSeed) {
		return (
			<div className="new-wallet-form">
				<h3> Initializing seed... </h3>
				<i className="fa fa-circle-o-notch fa-spin fa-4x" />
			</div>
		)
	}
	const handleInitSeedClick = (e) => {
		e.preventDefault()
		if (useCustomPassphrase) {
			createNewWallet(e.target.password.value.trim(), e.target.seed.value.trim())
		} else {
			createNewWallet(undefined, e.target.seed.value.trim())
		}
	}
	const handleCancelClick = (e) => {
		e.preventDefault()
		hideInitSeedForm()
	}
	return (
		<form className="new-wallet-form" onSubmit={handleInitSeedClick}>
			<h3 className="dialog__title"> Enter a seed to initialize your wallet from. </h3>
			<div className="dialog__content">
				<p className="dialog__content-text">
					This will initialize your wallet from the provided seed, rescanning the blockchain to find all your money. This rescan process can take a while. The blockchain must also be synced.
				</p>
				<input className="input" type="text" name="seed" placeholder="Seed" autoFocus />
				{useCustomPassphrase
					&& <input type="password" className="input" placeholder="Desired password" name="password" />}
			</div>
			<div className="new-wallet-form-buttons">
				<button className="button button--tertiary button--danger" onClick={handleCancelClick}>Cancel</button>
				<button className="button button--primary" type="submit">Confirm</button>
			</div>
		</form>
	)
}

export default InitSeedForm

