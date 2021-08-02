import logger from './logger';

export interface Device {
  id: string;
  type: string;
  [deviceName: string]: {};
  netlist: {};
}

/** Class representing a topology. */
export class Topology {
  /**
   * Create a topology.
   * @param {string} id - The topology id.
   * @param {Array<Device>} components - The components of the topology containing its devices.
   */

  id: string;

  constructor(topologyID: string) {
    this.id = topologyID;
  }

  components: Array<Device> = [];

  /**
   * query the devices of this topology.
   * @return {Array<Device>} array of devices of this topology.
   */
  queryDevices(): Array<Device> {
    let devices: Array<Device> = [];
    let i = 0;
    logger('Devices of Topology ' + this.id + ':');
    console.log('Devices of Topology ' + this.id + ':');
    this.components.forEach((device) => {
      devices.push(device);
      i++;
      logger(' Device #' + i + ': \n ' + JSON.stringify(device, null, 4));
      console.log(' Device #' + i + ': \n ' + JSON.stringify(device, null, 4));
    });
    return devices;
  }

  /**
   * query the deivces of this topology of a certain netlist node.
   * @param {string} NetlistNodeID -  string containing the netlist node id.
   * @return {Array<Device>} array of devices of this topology that has a certain netlist node.
   */
  queryDevicesWithNetlistNode(NetlistNodeID: string): Array<Device> {
    let devices: Array<Device> = [];
    this.components.forEach((device) => {
      Object.keys(device.netlist).forEach(function (key) {
        if (device.netlist[key] === NetlistNodeID) devices.push(device);
      });
    });

    let i = 0;
    logger('Devices with Netlist Node ' + NetlistNodeID + ':');
    console.log('Devices with Netlist Node ' + NetlistNodeID + ':');
    devices.forEach((device) => {
      i++;
      logger(' Device #' + i + ': \n ' + JSON.stringify(device, null, 4));
      console.log(' Device #' + i + ': \n ' + JSON.stringify(device, null, 4));
    });
    return devices;
  }
}
