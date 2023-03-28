import React from 'react';

const PlantDisease = ({ data }) => {
    const { is_healthy_probability, is_healthy, diseases } = data;

    return (
        <div>
            <h2>Plant Health:</h2>
            <p>Probability of being healthy: {is_healthy_probability}</p>
            <p>Is healthy? {is_healthy ? 'Yes' : 'No'}</p>

            <h2>Diseases:</h2>
            {diseases.map((disease) => (
                <div key={disease.entity_id}>
                    <h3>{disease.name}</h3>
                    <p>Probability: {disease.probability}</p>
                    <p>Description: {disease.disease_details.description}</p>
                    <p>Similar images:</p>
                    <ul>
                        {disease.similar_images.map((image) => (
                            <li key={image.id}>
                                <img src={image.url_small} alt="similar plant" />
                            </li>
                        ))}
                    </ul>
                    <p>Treatment:</p>
                    <ul>
                        {Object.entries(disease.disease_details.treatment).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PlantDisease;
