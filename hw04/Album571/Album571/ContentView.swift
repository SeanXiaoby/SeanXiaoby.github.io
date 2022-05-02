//
//  ContentView.swift
//  Album571
//
//  Created by Boyang Xiao on 5/2/22.
//


import SwiftUI
import UIKit

struct ContentView: View {
    @State private var showSheet: Bool = false
    @State private var showImagePicker: Bool = false
    @State private var sourceType: UIImagePickerController.SourceType = .photoLibrary
    @State private var image: UIImage?
    @State private var imageArr: [UIImage] = []
    
    
    var body: some View {
        let screenSize: CGRect = UIScreen.main.bounds
        let photoWidth = screenSize.width/3.3
        
        ZStack(alignment: .topLeading) {
            Color.clear
            VStack(alignment: .leading) {
                Text("Album 571")
                    .font(.system(size: 35))
                    .fontWeight(.bold)
                    .padding()
                ScrollView{
                    LazyVGrid(columns: [
                        GridItem(.flexible()),
                        GridItem(.flexible()),
                        GridItem(.flexible())
                    ], spacing: 18 ){
                        ForEach(imageArr, id: \.self){ image in
                            Image(uiImage: image)
                                .resizable()
                                .scaledToFill()
                                .frame(width: photoWidth, height: photoWidth)
                                .background(Color.pink)
                                .foregroundColor(.white)
                                .cornerRadius(10.0)
                        }
                        
                    }
                    
                }
                HStack(alignment: .center){
                    Button(action:{
                        self.showImagePicker = true
                        self.sourceType = .photoLibrary
                        AddPhoto()
                        
                    }){
                        HStack{
                            Image(systemName: "photo.on.rectangle.angled")
                            Text("Add from photo")
                        }
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color(red: 230/255, green: 230/255, blue: 230/255))
                    )
                    .frame(width: 200, height: 50, alignment: .center)
                    
                    Button(action:{
                        self.showImagePicker = true
                        self.sourceType = .camera
                        AddPhoto()
                    }){
                        HStack{
                            Image(systemName: "camera")
                            Text("Use Camera      ")
                        }
                    }
                    .padding()
                    .foregroundColor(Color.white)
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color(red: 52/255, green: 120/255, blue: 246/255))
                    )
                    .frame(width: 200, height: 50, alignment: .center)
                    
                }
                
            }.sheet(isPresented: $showImagePicker){
                ImagePicker(imageArr: self.$imageArr, isShown: self.$showImagePicker, sourceType: self.sourceType)
            }
            
        }.frame(maxWidth: .infinity, maxHeight: .infinity)
        
        
    }
    
    func AddPhoto(){
       
    }
    
    
}


#if DEBUG
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .previewInterfaceOrientation(.portrait)
    }
}

#endif
