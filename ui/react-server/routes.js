
module.exports = {
	routes: {
		Intro: {
			path: ['/'],
			method: 'get',
			page: './pages/intro',
		},
		Splash: {
			path: ['/splash'],
			method: 'get',
			page: './pages/splash',
		},
		Gallery: {
			path: ['/gallery'],
			method: 'get',
			page: './pages/gallery',
		},
		Match: {
			path: ['/gallery/123'],
			method: 'get',
			page: './pages/match',
		},
		Details: {
			path: ['/details/123'],
			method: 'get',
			page: './pages/details',
		},
		Info: {
			path: ['/info'],
			method: 'get',
			page: './pages/info',
		}
	},
};
