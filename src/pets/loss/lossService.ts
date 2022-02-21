import axios from "axios"
import { environment } from "../../app/environment/environment"

export interface Loss {
    id: string
    description: string
    date: string
    phone: string
    state: string
}
export interface LossFull {
    id: string;
    description: string;
    date: string;
    picture: string;
    phone: string;
    state: string;
    pet: {
        name: string;
        birthDate: Date;
        description: string;
    }
}

export async function newLoss(petId: string, payload: {
    description: string
    date: string
    picture: string
    phone: string
}): Promise<Loss> {
    console.log('esto en new')

    return (await axios.post(`${environment.backendUrl}/v1/pet/${petId}/loss`, payload))
        .data as Loss
}

export async function getLosses(petId: string): Promise<Loss[]> {
    return (await axios.get(`${environment.backendUrl}/v1/pet/${petId}/loss`)).data as Loss[]
}


export async function getLoss(petId: string, id: string): Promise<LossFull> {
    return (await axios.get(`${environment.backendUrl}/v1/pet/${petId}/loss/${id}`)).data as LossFull
}

export async function update(petId: string, id: string, payload: {
    description: string
    date: string
    picture: string
    phone: string
    state: string
}): Promise<Loss> {
    return (await axios.put(`${environment.backendUrl}v1/pet/${petId}/loss/${id}`,payload)).data as Loss
}   


export async function loadLosses(): Promise<Loss[]> {
    return (await axios.get(environment.backendUrl + "/v1/loss")).data as Loss[]
}


export async function loadLoss(id: string): Promise<LossFull> {
    return (await axios.get(environment.backendUrl + "/v1/loss/" + id)).data as LossFull
}
