from flask import request, jsonify
from services.review_service import ReviewService

review_service = ReviewService()

def register_review_routes(app):

    @app.route('/api/reviews', methods=['GET'])
    def get_all_reviews():
        reviews = review_service.get_all_reviews()
        return jsonify({'success': True, 'data': reviews, 'count': len(reviews)}), 200

    @app.route('/api/reviews/<int:review_id>', methods=['GET'])
    def get_review(review_id):
        review = review_service.get_review_by_id(review_id)
        if not review:
            return jsonify({'success': False, 'message': 'Review not found'}), 404
        return jsonify({'success': True, 'data': review}), 200

    @app.route('/api/reviews', methods=['POST'])
    def create_review():
        data = request.get_json()
        required = ['user_id', 'item_type', 'item_id', 'item_name', 'rating']
        missing = [f for f in required if f not in data]
        if missing:
            return jsonify({'success': False, 'message': f'Missing: {missing}'}), 400
        review = review_service.create_review(data)
        return jsonify({'success': True, 'message': 'Review created', 'data': review}), 201

    @app.route('/api/reviews/<int:review_id>', methods=['DELETE'])
    def delete_review(review_id):
        result = review_service.delete_review(review_id)
        return jsonify(result), 200

    @app.route('/api/reviews/item/<item_type>/<int:item_id>', methods=['GET'])
    def get_reviews_by_item(item_type, item_id):
        reviews = review_service.get_reviews_by_item(item_type, item_id)
        return jsonify({'success': True, 'data': reviews}), 200

    print("✅ Review routes registered")
