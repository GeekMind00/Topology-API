const API = require('./api');

describe('queryTopologies', () => {
  let topologies = [];
  topologies.push(API.readJSON('top1.json'));
  topologies.push(API.readJSON('top2.json'));
  topologies.push(API.readJSON('top3.json'));
  it('should return all topologies in memory', () => {
    const res = API.queryTopologies();
    expect(res).toEqual(topologies);
  });
});

describe('deleteTopology', () => {
  it('should delete a certain topology in memory', () => {
    API.deleteTopology('top3');
    let topologiesAfterDelete = API.queryTopologies();
    const res = topologiesAfterDelete.length;
    expect(res).toBe(2);
  });
});

describe('queryDevices', () => {
  let topologies = API.queryTopologies();
  it('should return all devices of a certain topology in memory', () => {
    const res = API.queryDevices('top1');
    expect(res).toEqual(topologies[0].components);
  });
});

describe('queryDevicesWithNetlistNode', () => {
  it('should return all devices of a certain topology & of a certain netlist node in memory', () => {
    const res = API.queryDevicesWithNetlistNode('top1', 'n1');
    expect(res.length).toEqual(2);
    expect(res[0].id).toEqual('res1');
    expect(res[1].id).toEqual('m1');
  });
});

describe('readJSON', () => {
  it('should read topology from json & store in memory ', () => {
    API.readJSON('top3.json');
    const res = API.queryTopologies().length;
    expect(res).toEqual(3);
  });
});
