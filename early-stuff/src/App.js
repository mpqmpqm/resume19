import React from 'react';
import './App.css';
import Albums from "./components/Albums"
import Thumb from "./components/Thumb"
import Act from "./components/Act"

//Discogs key: tYumlFYEMwUXeeIURptE
//Discogs secret: wDhnGZAYPXjdhQDHWdduAXHQAbAjnCAE

const discogsKey = 'tYumlFYEMwUXeeIURptE'
const discogsSecret = 'wDhnGZAYPXjdhQDHWdduAXHQAbAjnCAE'

class App extends React.Component {

	constructor () {
		super ();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			act: {
				loading: false,
				init: true,
				link: '',
				name: '',
				foundAct: false
			},
			loading: false,
			data: {},
			value: '',
			titles: [],
			years: [],
			thumb: {
				src: '',
				loading: false
			}
		}
	}

	handleChange (event) {
		this.setState ({
			value: event.target.value
		})
	}

	handleSubmit (event) {
		event.preventDefault();

		this.setState ({act: {loading: true, init: false}, loading: true, thumb: {loading: true}})

		fetch (`https://api.discogs.com/database/search?type=artist&q=${this.state.value}&key=${discogsKey}&secret=${discogsSecret}`)
			.then (response => response.json())
				.then (data => {
					this.setState ({data: data})})
						.then (() => 
							{
								if (this.state.data.results.length > 0) {

								this.setState(
									{ 
										act: 
											{foundAct: true,
											name: this.state.data.results[0].title,
											link: `https://www.discogs.com${this.state.data.results[0].uri}`,
											loading: false},
										thumb: 
											{src: this.state.data.results[0].thumb, 
											loading: false},
									})

									fetch (`https://api.discogs.com/artists/${this.state.data.results[0].id}/releases?year,asc&page=1&per_page=3&key=${discogsKey}&secret=${discogsSecret}`)
										.then (response => response.json())
											.then (data => {

												let i = 0;
												let titles = []
												let years = []

												// console.log(data);

												for (i; i < data.releases.length; i++) {
													if (i > 2) {
														break
													} else {
														titles.push (data.releases[i].title)
														years.push (data.releases[i].year)
													}
													}
												

												this.setState ({
													// artist: data.releases[0].artist,
													titles: titles,
													years: years,
													loading: false
													// header: data.releases[0].artist
												})

											})

									}
											// console.log(data.releases[i].artist, data.releases[i].title, data.releases[i].format);})
					
				
								else {
									this.setState ({act: {name: 'Not found, please try again.'}, loading: false, foundAct: false});
								}})

		
		event.target.reset();
		event.target.focus();

  }


	render () {

		return (
			<div className = 'app'>

				<h1>I liked their early stuff better...</h1>

				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange}/>
					<input type="submit" value='Submit'/>
				</form>
				<div className = 'info'>
					
					<div className="thumb"><Thumb
					src = {this.state.thumb.src}
					alt = {this.state.act.name}
					foundAct = {this.state.act.foundAct}
					loading = {this.state.thumb.loading}/></div>

					<div className = 'text'> 	
						<Act 
							name = {this.state.act.name}
							link = {this.state.act.link}
							init = {this.state.act.init}
							loading = {this.state.act.loading}
							foundAct = {this.state.act.foundAct}
							/>
						
						<Albums titles={this.state.titles} years = {this.state.years} loading = {this.state.loading} foundAct = {this.state.act.foundAct}/>
					</div>

				</div>
			</div>
		)
		}

	}
export default App;
