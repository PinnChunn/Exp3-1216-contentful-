import React from 'react';
import { useEvents } from './useEvents';
import EventCard from '../EventCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';

export default function EventList() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!events?.length) {
    return <EmptyState message="No events available at the moment." />;
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