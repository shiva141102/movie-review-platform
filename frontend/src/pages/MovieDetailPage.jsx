import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewForm from '../components/ReviewForm';
import WatchlistButton from '../components/WatchlistButton';
import { AuthContext } from '../context/AuthContext';


export default function MovieDetailPage() {
const { id } = useParams();
const [movie, setMovie] = useState(null);
const [loading, setLoading] = useState(true);
const { user } = useContext(AuthContext);


useEffect(() => {
async function load() {
setLoading(true);
try {
const res = await API.get(`/movies/${id}`);
setMovie(res.data);
} catch (err
