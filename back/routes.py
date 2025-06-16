from flask import  request, jsonify, Blueprint
from data import load_contacts, save_contacts
import uuid

contacts_bp = Blueprint('contacts', __name__, url_prefix='/api/contacts')

# /api/contacts

# Returns a list of all the contacts
@contacts_bp.route('/', methods = ['GET'])
def get_all_contacts():
    return jsonify(load_contacts()), 200

# Adds a contact to the in memory list of contacts
@contacts_bp.route('/', methods = ['POST'])
def add_contact():
    contacts = load_contacts()
    request_data = request.get_json()
    
    new_contact = {
        "id": str(uuid.uuid4()),
        "name": request_data["name"],
        "last_name": request_data["last_name"],
        "phone": request_data["phone"],
        "email": request_data["email"],
        "street": request_data["street"],
        "city": request_data["city"],
        "state": request_data["state"],
        "company": request_data["company"],
        "position": request_data["position"],
        "notes": request_data["notes"],
        "birthday": request_data["birthday"],
        "favorite": "false"
    }

    contacts.append(new_contact)
    save_contacts(contacts)

    return jsonify(new_contact), 201

# /api/contacts/<id>

# Returns the information of a contact with a given id
@contacts_bp.route('/<id>', methods = ['GET'])
def get_contact(id):
    contacts = load_contacts()
    for contact in contacts:
        if contact['id'] == id:
            return jsonify(contact), 200

    return jsonify({'error':'get_contact controller server error, contact not found'}), 404

# Update a contact given their id
@contacts_bp.route('/<id>', methods = ['PATCH'])
def update_contact(id):
    contacts = load_contacts()

    for i, contact in enumerate(contacts):
        if contact['id'] == id:
            request_data = request.get_json()

            contacts[i] = {
                "id": id,
                "name": request_data["name"],
                "last_name": request_data["last_name"],
                "phone": request_data["phone"],
                "email": request_data["email"],
                "street": request_data["street"],
                "city": request_data["city"],
                "state": request_data["state"],
                "company": request_data["company"],
                "position": request_data["position"],
                "notes": request_data["notes"],
                "birthday": request_data["birthday"],
                "favorite": contact["favorite"]
                }
            save_contacts(contacts)
            
            return jsonify(contacts[i]), 200

    return jsonify({'error':'update_contact controller server error, contact not found'}), 404

# Remove a user with an specified id
@contacts_bp.route('/<id>', methods = ['DELETE'])
def delete_contact(id):
    contacts = load_contacts()

    for i, contact in enumerate(contacts):
        if contact['id'] == id:
            contacts.pop(i)
            save_contacts(contacts)
            return jsonify({'message':'Contact deleted successfully'}), 200
    
    return jsonify({'error':'delete_contact controller server error, contact not found'}), 404

# /api/contacts//favorite/<id>

# Make a contact a favorite or unfavorite
@contacts_bp.route('/favorite/<id>', methods = ['PATCH'])
def favorite_contact(id):
    contacts = load_contacts()

    for i, contact in enumerate(contacts):
        if contact['id'] == id:
            request_data = request.get_json()


            if request_data["favorite"] == "true":
                new_state = "false"
            else:
                new_state = "true"

            contacts[i] = {
                "id": id,
                "name": contact["name"],
                "last_name": contact["last_name"],
                "phone": contact["phone"],
                "email": contact["email"],
                "street": contact["street"],
                "city": contact["city"],
                "state": contact["state"],
                "company": contact["company"],
                "position": contact["position"],
                "notes": contact["notes"],
                "birthday": contact["birthday"],
                "favorite": new_state
                }
            save_contacts(contacts)
            
            return jsonify(contacts[i]), 200

    return jsonify({'error':'favorite_contact controller server error, contact not found'}), 404