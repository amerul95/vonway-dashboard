"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function LoginFormAction(formData : FormData) {

    const email = formData.get("email")
    const password = formData.get("password")

    const body = {
        email,
        password,
        rememberMe: true,
        powChallenge:{
            challenge:{
                algorithm:"SHA-256",
                challenge:"string",
                maxNumber: 0,
                salt:"string",
                signature:"string"
            }
        },
        captcha: {
            iamge:{
                id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
                solution: "string"
            }
        }
    }

    try {
        const res = await fetch("https://secure.vonwayforex.com/client-api/login?version=1.0.0",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(body)
        })

        if(!res.ok){
            console.log("fetch error")
        }

        const data = await res.json()
        console.log(data)
 
        // redirect('/dashboard')

    } catch (error) {
        console.log("internal error")
    }
}