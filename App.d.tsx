type searchQueryString = {
  "param": String,
  "value": String,
  "token": String,
  "standalone": Boolean,
  "start": Number,
  "end": Number,
  "raw_value": String,
  "range": Boolean,
  "multiple": Boolean,
  "stopwords": []
};

type course = {
  "type": String,
  "course_id": String,
  "id": String,
  "catalog_number": String,
  "description": String,
  "title": String,
  "repeatable": String,
  "repeat_limit": String,
  "units_repeat_limit": String,
  "offer_frequency": String,
  "credits_minimum": String,
  "credits_maximum": String,
  "grading_basis": any,
  "subject": any,
  "equivalency": any,
  "course_attributes": any[],
  "sections": section[]
}

type section = {
  "type": String,
  "id": String,
  "class_number": String,
  "number": String,
  "component": String,
  "location": String,
  "notes": String,
  "status": String,
  "print": String,
  "enrollment_cap": String,
  "instruction_mode": {
    "type": String,
    "instruction_mode_id": String,
    "id": String,
    "description": String
  },
  "instructors": instructor[],
  "meeting_patterns": meeting_pattern[],
  "combined_sections": any[]
}

type instructor = {
  "type": String,
  "name": String,
  "email": String,
  "role": String,
  "print": String
}

type meeting_pattern = {
  "type": String,
  "start_time": null,
  "end_time": null,
  "start_date": String,
  "end_date": String,
  "location": {
    "type": String,
    "location_id": String,
    "id": String,
    "description": String
  },
  "days": []
}