const celebrateErrorResponses = [
  {
    status: 'error',
    route: '/tracks',
    message: 'city or valid coordinates(lon,lon) must be informed.',
    examples: ['/tracks?city=São Paulo', '/tracks?lat=-23.5&lon=-46.6'],
    keys: ['lat', 'lon', 'city']
  }
];

export default celebrateErrorResponses;
