import { Vector3 } from "react-three-fiber";

export interface IProxyCurrentState{
    current: string | null;
    mode:number;
    position: any;
}

export interface IModelProps{
    name: string;
    position: any;
    color: string;
    rotation?: any;
    scale?: number;    
    func?: (zoom: boolean) => void;
}

export interface IPageProps{
    width?: string;
    height?: string;
    cameraPos?: Vector3;
    callback?: (zoom: boolean) => void;
    resetFunc?: any;
}

export interface IControlProps{
    func?: (zoom: boolean) => void;
}

export interface IControlRef{
    func: () => void;
}