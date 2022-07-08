import React, { Component } from "react";
import { 
  Text,
  View, 
  Image,
  StyleSheet,
  SafeAreaView, 
  Platform, 
  StatusBar, 
  Dimensions, 
  ScrollView, 
  TextInput } from "react-native";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
      previewImage : 'image_1',
      dropDownHeight : 40,
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

	render() {
		if (!this.state.fontsLoaded) {
			return <AppLoading />
		} else {

      let preview_Images = {
        "image_1" : require("../assets/story_image_1.png"),
        "image_2" : require("../assets/story_image_2.png"),
        "image_3" : require("../assets/story_image_3.png"),
        "image_4" : require("../assets/story_image_4.png"),
        "image_5" : require("../assets/story_image_5.png")
      }

			return(
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image
							source={require("../assets/logo.png")}
							style={styles.iconImage}
						></Image>
					</View>
					<View style={styles.appTitleTextContainer}>
						<Text style={styles.appTitleText}>New Story</Text>
					</View>
          <View style={styles.fieldsContainer}>
              <Image source={preview_Images[this.state.previewImage]}
                     style={styles.previewImageA}
              >
              </Image>
              <View style={{height : RFValue(this.state.dropDownHeight)}}>
                <DropDownPicker 
                items={[
                {label : "image1", value : "image_1"},
                {label : "image2", value : "image_2"},
                {label : "image3", value : "image_3"},
                {label : "image4", value : "image_4"},
                {label : "image5", value : "image_5"},
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropDownHeight === 170 ? true : false}
                onOpen={()=>{
                  this.setState({
                    dropDownHeight : 170
                  })
                }}
                onClose={()=>{
                  this.setState({
                    dropDownHeight : 40
                  })
                }}
                style={{backgroundColor : 'transparent', borderWidth : 1, borderColor : 'white'}}
                textStyle={{color : this.state.dropDownHeight == 170 ? 'black' : 'white', fontFamily : "Bubblegum-Sans"}}
                onSelectItem={(items)=>this.setState({ previewImage : items.value })}
                />
              </View>
              <ScrollView>
                <TextInput 
                style={styles.inputFont} 
                onChangeText={title => this.setState({ title })} 
                placeholder={"Title"} 
                placeholderTextColor="white"/>
                <TextInput 
                  style={[styles.inputFont,styles.inputFontEXTRA,styles.inputTextBIG]}
                  onChangeText={descripition => this.setState({ descripition })}
                  placeholder={"Description"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor="white"
                />
                <TextInput 
                  style={[styles.inputFont,styles.inputFontEXTRA,styles.inputTextBIG]}
                  onChangeText={story => this.setState({ story })}
                  placeholder={"Story"}
                  multiline={true}
                  numberOfLines={20}
                  placeholderTextColor="white"
                />
                <TextInput 
                  style={[styles.inputFont,styles.inputFontEXTRA,styles.inputTextBIG]}
                  onChangeText={moral => this.setState({ moral })}
                  placeholder={"Moral Of da story"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor="white"
                />
              </ScrollView>
          </View>
        </View>
			</View>
      )
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#15193c"
	},
	droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
	},
	appTitle: {
		flex: 0.07,
		flexDirection: "row"
	},
	appIcon: {
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center"
	},
	iconImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: "center"
	},
	appTitleText: {
		color: "white",
		fontSize: RFValue(28),
		fontFamily: "Bubblegum-Sans"
	},
  fieldsContainer : {
    flex : 0.5
  },
  previewImageA : {
    width : '95%',
    height : RFValue(250),
    alignSelf : 'center',
    borderRadius : RFValue(10),
    marginVertical : RFValue(10),
    resizeMode : 'contain'
  },
  inputFont : {
    height : RFValue(40),
    borderColor : 'white',
    borderWidth : RFValue(1),
    borderRadius : RFValue(10),
    paddingLeft : RFValue(10),
    color : "white",
    fontFamily : "Bubblegum-Sans"
  },
  inputFontEXTRA : {
    marginTop : RFValue(50),
  },
  inputTextBIG : {
    textAlignVertical : 'top',
    padding : RFValue(5),
  }
})