import React, { useEffect, useState } from 'react';
import { getContentfulEvents } from '../lib/contentful';
import EventCard from './EventCard';
import { Loader2 } from 'lucide-react';

export default function EventList() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { events: fetchedEvents, error } = await getContentfulEvents();
      
      if (error) {
        setError(error);
      } else {
        setEvents(fetchedEvents);
      }
      
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading events: {error}</p>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No events available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          onRegister={() => {/* Handle registration */}}
          isAuthenticated={false}
          isRegistered={false}
        />
      ))}
    </div>
  );
}