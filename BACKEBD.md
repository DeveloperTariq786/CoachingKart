Lectures API Responses
Base URL
/api/v1/institution/client/lectures

Authentication
All endpoints require:

valid authentication token
student role in the institution
1) Get Batch and Subjects
Endpoint
GET /api/v1/institution/client/lectures/batch-subjects?batchId=...

Query Parameters
batchId (required): string
Success Response (200)
{
  "success": true,
  "message": "Batch and subjects fetched successfully",
  "data": {
    "batch": {
      "name": "Batch A"
    },
    "subjects": [
      {
        "id": "subject_id",
        "name": "Mathematics",
        "icon": "icon-url"
      }
    ]
  }
}
Error Responses
400 - Missing batchId
{
  "success": false,
  "message": "Batch ID is required"
}
403 - User not enrolled
{
  "success": false,
  "message": "You are not enrolled in this batch"
}
404 - Batch not found
{
  "success": false,
  "message": "Batch not found"
}
500 - Server error
{
  "success": false,
  "message": "Error message"
}
2) Get Lectures for a Batch
Endpoint
GET /api/v1/institution/client/lectures?batchId=...

Query Parameters
batchId (required): string
subjectId (optional): string
page (optional): number, default 1
limit (optional): number, default 10, max 100
search (optional): string
Success Response (200)
{
  "success": true,
  "message": "Lectures fetched successfully",
  "data": {
    "lectures": [
      {
        "id": "lecture_id",
        "title": "Introduction to Algebra",
        "description": "Lecture description",
        "videoUrl": "https://example.com/video.mp4",
        "thumbnail": "https://example.com/thumbnail.jpg",
        "duration": "30:00",
        "order": 1,
        "createdAt": "2026-07-06T00:00:00.000Z",
        "updatedAt": "2026-07-06T00:00:00.000Z",
        "subjectId": "subject_id",
        "faculty": {
          "name": "Dr. John",
          "profileImage": "https://example.com/profile.jpg"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "limit": 10,
      "totalLectures": 25,
      "totalPages": 3,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
Error Responses
400 - Missing batchId
{
  "success": false,
  "message": "Batch ID is required"
}
400 - Subject does not belong to batch
{
  "success": false,
  "message": "Subject does not belong to this batch"
}
403 - User not enrolled
{
  "success": false,
  "message": "You are not enrolled in this batch"
}
500 - Server error
{
  "success": false,
  "message": "Error message"
}
3) Get Lecture Detail
Endpoint
GET /api/v1/institution/client/lectures/detail

Query Parameters
You can call it in either of these ways:

Option A: By lectureId
lectureId (required): string
Option B: By order and batchId
order (required): number
batchId (required): string
subjectId (optional): string
Success Response (200)
{
  "success": true,
  "message": "Lecture fetched successfully",
  "data": {
    "id": "lecture_id",
    "title": "Introduction to Algebra",
    "description": "Lecture description",
    "videoUrl": "https://example.com/video.mp4",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "duration": "30:00",
    "order": 1,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "faculty": {
      "name": "Dr. John",
      "profileImage": "https://example.com/profile.jpg",
      "tag": "Math Faculty"
    },
    "resources": {
      "studyMaterials": 3
    }
  }
}
Error Responses
400 - Missing required params
{
  "success": false,
  "message": "Either lectureId or (order and batchId) is required"
}
{
  "success": false,
  "message": "batchId is required when using order parameter"
}
403 - User not enrolled
{
  "success": false,
  "message": "You are not enrolled in this batch"
}
404 - Lecture not found
{
  "success": false,
  "message": "Lecture not found with the given order"
}
{
  "success": false,
  "message": "Lecture not found"
}
500 - Server error
{
  "success": false,
  "message": "Error message"
}
Example Requests
GET /api/v1/institution/client/lectures/batch-subjects?batchId=batch_id
GET /api/v1/institution/client/lectures?batchId=batch_id&subjectId=subject_id&page=1&limit=10&search=algebra
GET /api/v1/institution/client/lectures/detail?lectureId=lecture_id
GET /api/v1/institution/client/lectures/detail?order=1&batchId=batch_id&subjectId=subject_id