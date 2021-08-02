Topology-API

## About The Project

> Topology-API is an API that provides the functionality to access, manage and store device topologies. The best candidate for such an application is c++, but since I wanted to deliver it as fast as possible, I thought about javascript, but once again JS can't deal well with OOP applications. so I went with a similar yet better OOP language: typescript. Also has easy testing & documentation.   

### Built with

- main project [typescript](https://www.typescriptlang.org/)
- Unit testing: [jest](https://jestjs.io/).
- Function documentation: [typedoc](https://typedoc.org).

## Getting Started

> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these instructions.

### Installation

1. **_Clone the repository_**

```sh
git clone git@github.com:GeekMind00/Topology-API.git
```

2. **_Navigate to repository directory_**

```sh
$ cd Topology-API
```

3. **_Install dependencies_**

```sh
$ npm i
```

### Running

1. **_Running the application_**

```sh
$ npm run start
```
- Console Commands:
    - To read a topology from a json file and store it in memory: ```read [filename]```
    - To write a topology from memory to a json file: ```write [topologyID] ```
    - To delete a certain topology from memory: ```delete [topologyID]```
    - To query all the topologies in memory: ```getTopologies ``` 
    - To query all devices of a certain topology: ```getDevices [topologyID]```
    - To query all devices of a certain topology that has a certain netlist node: ```getDevicesWithNetlistNode [topologyID] [netlistNodeID]```

2. **Running the tests**

```sh
$ npm run test
```

3. **Running the documentation**

```sh
$ npm run doc
```


