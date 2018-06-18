// Resource lists
const apiEndpointsList = [
  {
    type: 'homes',
    title: 'Get all homes',
    url: 'homes/'
  },
  {
    type: 'homes',
    title: 'Get single home by ID',
    labels: ['Home Id'],
    inputs: ['homeId'],
    url: `homes/:homeId`
  },
  {
    type: 'animals',
    title: 'Get all animals',
    labels: ['Home Id'],
    inputs: ['homeId'],
    url: `homes/:homeId/animals`
  },
  {
    type: 'animals',
    title: 'Get single animal by ID',
    labels: ['Home Id', 'Animal id'],
    inputs: ['homeId', 'animalId'],
    url: `homes/:homeId/animals/:animalId`
  },
  {
    type: 'users',
    title: 'Get home owner(user) by ID',
    labels: ['User id'],
    inputs: ['userId'],
    url: `users/:userId/`
  }
];


apiEndpointsList.forEach(item => {
  const index = apiEndpointsList.indexOf(item);
  new ApiEndpointItem(item.type, item.title, item.labels, item.inputs, item.url, index); // instance ID1
});