import React, { useContext, useEffect, useState } from 'react'
import { fetchHabits, createHabit, deleteHabit } from '../../api.js'
import HabitCard from '../HabbitCard/HabitCard.jsx'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import "./Home.css";


const Home = () => {
    const [habits, setHabits] = useState([])
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState(2)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [userId,setUserId] = useState(localStorage.getItem("habbitUserId"))


    // temporary fixed userId
    // const userId = "000000000000000000000000"
    

    const load = async () => {
        try {
        
        setLoading(true)
        const res = await fetchHabits(userId)
        const filteredHabits = res.data.map(habit => {
            habit.done = false
            return habit
        })
        setHabits(filteredHabits)
        } catch (err) {
        console.error(err)
        } finally {
        setLoading(false)
        }
    }

    const updateDone = (habitId) => {
        setHabits(habits.map(h => {
        if (h._id === habitId) {
            h.done = true
        }
        return h
        }))
    }

    const logOut = () => {
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("habbitUserId")
        navigate("/login")
    }


    useEffect(() => { 
        
        load() 
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault()
        if (!name.trim()) return

        const payload = {
        userId,
        name,
        category,
        priority,
        startDate: dayjs().toDate()
        }

        await createHabit(payload)
        setName("")
        setCategory("")
        setPriority(2)
        load()
    }

    const handleDelete = async (id) => {
        await deleteHabit(id)
        load()
    }

    return (
        <div className="home">
            <div className='logout-cont'>
        <button className="bg-sky-500 text-white px-4 py-2 rounded logout" onClick={logOut}>Logout</button>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Habit Tracker</h1>
        
        

        {/* Add Habit Form */}
        <form
            onSubmit={handleAdd}
            className="form-cont p-4 bg-white shadow rounded-xl flex flex-col gap-3 mb-6"
        >
            <input
            type="text"
            placeholder="Habit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            />

            <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
            />

            <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-2 rounded"
            >
            <option value={1}>Priority 1</option>
            <option value={2}>Priority 2</option>
            <option value={3}>Priority 3</option>
            </select>

            <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded"
            >
            Add Habit
            </button>
        </form>

        {/* Habits List */}
        {loading ? (
            <p className="text-center text-slate-500">Loading...</p>
        ) : habits.length === 0 ? (
            <p className="text-center text-slate-400">No habits yet. Add one!</p>
        ) : (
            <div className="Home-cards-cont">
            {habits.map((h) => (
                <HabitCard
                key={h._id}
                habit={h}
                onDeleted={handleDelete}
                onUpdated={load}
                updateDone={updateDone}
                />
            ))}
            </div>
        )}
        </div>
    )
}

export default Home;