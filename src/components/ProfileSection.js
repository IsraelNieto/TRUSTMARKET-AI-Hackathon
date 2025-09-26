// src/components/ProfileSection.js

import React, { useState } from 'react';

const ProfileSection = ({ title, children, editContent, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    onSave(); // Llama a la función de guardado del padre
    setIsEditing(false); // Vuelve al modo de vista
  };

  return (
    <div className="profile-section-card">
      <div className="section-header">
        <h4>{title}</h4>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Modificar
          </button>
        )}
      </div>
      
      {!isEditing ? (
        <div className="section-content">{children}</div>
      ) : (
        <div className="section-edit-form">
          {editContent}
          <div className="form-actions">
            <button className="btn-secondary" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
            <button className="submit-btn" onClick={handleSaveClick}>
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;