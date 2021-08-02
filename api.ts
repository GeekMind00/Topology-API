const fs = require('fs');
import { Topology, Device } from './topology';
import logger from './logger';

export let TOPOLOGIES: Topology[] = []; //All Topologies in memory

//=========================================================================
/**
 * get a certain topology in memory by ID
 * @param {string} TopologyID
 * @returns {Topology}
 */
export function getTopology(TopologyID: string): Topology {
  let ansTopology = new Topology(TopologyID);
  TOPOLOGIES.forEach((topology) => {
    if (topology.id === TopologyID) ansTopology = topology;
  });
  return ansTopology;
}
//=========================================================================
/**
 * read a topology from a json file and store it in memory
 * @param {string} FileName
 * @returns {Topology}
 */
export function readJSON(FileName: string): Topology {
  let rawTopology = fs.readFileSync(FileName);
  let parsedTopology = JSON.parse(rawTopology);

  logger(parsedTopology.id + ' read successfully');
  console.log(parsedTopology.id + ' read successfully');

  let topology = new Topology(parsedTopology.id);

  parsedTopology.components.forEach((parsedDevice) => {
    let device: Device = {
      id: '',
      type: '',
      netlist: {},
    };
    Object.keys(parsedDevice).forEach(function (key) {
      if (key === 'type') {
        device.type = parsedDevice[key];
      } else if (key === 'id') {
        device.id = parsedDevice[key];
      } else if (key === 'netlist') {
        device.netlist = parsedDevice[key];
      } else {
        device[key] = parsedDevice[key];
      }
    });
    topology.components.push(device);
  });
  TOPOLOGIES.push(topology);
  return topology;
}
//=========================================================================
/**
 * write a certain topology from memory to a json file
 * @param {string} TopologyID
 */
export function writeJSON(TopologyID: string): void {
  let topology = getTopology(TopologyID);
  if (topology.components.length === 0) {
    logger('Requested Topology (' + TopologyID + ') not found');
    console.log('Requested Topology (' + TopologyID + ') not found');
    return;
  }
  let json = JSON.stringify(topology, null, 4);
  fs.writeFile('writtenTopologies.json', json, 'utf8', (err) => {
    if (err) throw err;
    else {
      logger(TopologyID + ' written successfully');
      console.log(TopologyID + ' written successfully');
    }
  });
}
//=========================================================================
/**
 * query all topologies from memory
 * @returns {Array<Topology>}
 */
export function queryTopologies(): Array<Topology> {
  if (TOPOLOGIES.length === 0) {
    logger('Topologies in Memory:');
    console.log('Topologies in Memory:');
    logger(' There are no Topologies in memory.');
    console.log(' There are no Topologies in memory.');
  } else {
    let i = 0;
    logger('Topologies in Memory:');
    console.log('Topologies in Memory:');
    TOPOLOGIES.forEach((topology) => {
      i++;
      logger(' Topology #' + i + ': ' + JSON.stringify(topology, null, 4));
      console.log(' Topology #' + i + ': ' + JSON.stringify(topology, null, 4));
    });
  }
  return TOPOLOGIES;
}
//=========================================================================
/**
 * delete a certain topology from memory
 * @param {string} TopologyID
 */
export function deleteTopology(TopologyID: string): void {
  TOPOLOGIES.forEach((topology, index) => {
    if (topology.id === TopologyID) {
      TOPOLOGIES.splice(index, 1);
      logger(TopologyID + ' deleted successfully');
      console.log(TopologyID + ' deleted successfully');
    }
  });
}
//=========================================================================
/**
 * query all devices of a certain topology from memory
 * @param {string} TopologyID
 * @returns {Array<Device>}
 */
export function queryDevices(TopologyID: string): Array<Device> {
  let topology = getTopology(TopologyID);
  if (topology.components.length === 0) {
    logger('Requested Topology (' + TopologyID + ') not found');
    console.log('Requested Topology (' + TopologyID + ') not found');
    return;
  }
  let devices = topology.queryDevices();
  return devices;
}
//=========================================================================
/**
 * query all devices of a certain topology of a certain netlist node from memory
 * @param TopologyID
 * @param NetlistNodeID
 * @returns {Array<Device>}
 */
export function queryDevicesWithNetlistNode(
  TopologyID: string,
  NetlistNodeID: string
): Array<Device> {
  let topology = getTopology(TopologyID);
  if (topology.components.length === 0) {
    logger('Requested Topology (' + TopologyID + ') not found');
    console.log('Requested Topology (' + TopologyID + ') not found');
    return;
  }
  let devices = topology.queryDevicesWithNetlistNode(NetlistNodeID);
  return devices;
}
//=========================================================================
